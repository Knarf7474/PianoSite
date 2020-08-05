let code = [];

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
        if (code.join('') === 'GCCCGDBC'){ // HEEEEY!! NIET VALSSPELEN JIJ!
          //Correct TODO
        } else {
          document.querySelector('.invalid_message').style.display = 'block'
          setTimeout(function() {
            // code = [];
            // update_code_visual();
            document.querySelector('.invalid_message').style.display = 'none'
          }, 3000);
        }
      }
    } else {
      code = [key];
      update_code_visual();
    }
  })
})

function update_code_visual(){
  const code_section = document.querySelector('.code')
  const fields = Array.from(document.querySelectorAll('.code span .text'))
  for(let i = 0; i < 8; i++){
    fields[i].innerText = code[i] || '';
  }
}

