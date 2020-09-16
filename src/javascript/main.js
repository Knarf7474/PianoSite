let code = [];
const correct_code = 'GCCCGDBC';

const piano = SampleLibrary.load({
  instruments: "piano"
});
piano.toDestination();

document.querySelectorAll('.key').forEach(function(key_elem){
  key_elem.addEventListener('click', async function(event){
    let key = Array.from(event.currentTarget.classList).filter(klass => klass.length <= 2)[0];

    const octave = key.match(/[CDE]/) ? 4 : 3
    piano.triggerAttack(key+octave);

    if (code.length < 8){
      code.push(key)
      update_code_visual();

      if (code.length === 8){
        //Check if code correct
        if (code.join('') === correct_code){ // HEEEEY!! NIET VALSSPELEN JIJ!
          setTimeout(async function() {
            await sleep(1000);
            await play_song();

            setTimeout(function () {
              document.querySelector('.piano-part').style.display = 'none';
              document.querySelector('.reveal-part').style.display = 'block';
              const audio = document.querySelector('.wedding_music')
              audio.loop = true
              audio.play();
            }, 500)
          })
        } else {
          document.querySelector('.invalid_message').style.display = 'block'
          // setTimeout(function() {
          //   // code = [];
          //   // update_code_visual();
          //   document.querySelector('.invalid_message').style.display = 'none'
          // }, 3000);
        }
      }
    } else {
      // code = [key];
      // update_code_visual();
    }
  })
})

document.querySelector('.code-part button.to-piano').addEventListener('click', function(event){
  document.querySelector('.code-part').style.display = 'none';
  document.querySelector('.piano-part').style.display = 'block';
})

document.querySelector('.code .restart').addEventListener('click', async function(event) {
  document.querySelector('.invalid_message').style.display = 'none';
  code = [];
  update_code_visual();
})

document.querySelector('.stop_music').addEventListener('click', async function(event) {
  const audio = document.querySelector('.wedding_music')
  audio.pause();
})

function update_code_visual(){
  let incorrect_puzzles = []
  const code_section = document.querySelector('.code')
  const fields = Array.from(document.querySelectorAll('.code span .text'))
  for(let i = 0; i < 8; i++){
    const content = code[i] || '';
    fields[i].innerText = content
    if (content){
      fields[i].parentNode.classList.add('filled')
      if (code[i] !== correct_code[i]) {
        const puzzle_num = parseInt(i / 2) + 1
        if(incorrect_puzzles.indexOf(puzzle_num) === -1) {
          incorrect_puzzles.push(puzzle_num)
        }
      }
    } else {
      fields[i].parentNode.classList.remove('filled')
    }
  }

  if (incorrect_puzzles.length === 1) {
    document.querySelector('.invalid_message .puzzles').innerText = 'puzzel ' + incorrect_puzzles[0]
  } else if(incorrect_puzzles.length > 1) {
    document.querySelector('.invalid_message .puzzles').innerText = 'puzzels ' + incorrect_puzzles.join(' & ')
  }
}

async function play_song(one,two,three,four){
  const speed_factor = 1.4
  await strike_key('G')
  await sleep(400 * speed_factor);
  await strike_key('C')
  await sleep(300 * speed_factor);
  await strike_key('C')
  await sleep(200 * speed_factor);
  await strike_key('C')
  await sleep(700 * speed_factor);

  await strike_key('G')
  await sleep(400 * speed_factor);
  await strike_key('D')
  await sleep(300 * speed_factor);
  await strike_key('B')
  await sleep(200 * speed_factor);
  await strike_key('C')
  await sleep(700 * speed_factor);
}

async function strike_key(note, time){
  const key = document.querySelector('.key.white.'+ note)
  key.click()
  key.classList.add('active')
  setTimeout(function(){
      key.classList.remove('active')
  }, 200)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
