let code = '';

document.querySelectorAll('.key').forEach(function(key_elem){
  key_elem.addEventListener('click', function(event){
    let key = Array.from(event.currentTarget.classList).filter(klass => klass.length <= 2)[0];

    if (code.length < 8){
      code += key
      update_code_visual();

      if (code.length === 8){
        //Check if code correct
        if (code === 'GCCCGDBC'){ // HEEEEY!! NIET VALSSPELEN JIJ!
          //Correct

        } else {
          document.querySelector('.invalid_message').style.display = 'block'
          setTimeout(function() {
              code = '';
              update_code_visual();
            }, 3000);
        }
      }
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

