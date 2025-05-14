document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('semConvenio');
    const inputConvenio = document.getElementById('convenio');
  
    if (checkbox && inputConvenio) {
      checkbox.addEventListener('change', function () {
        if (this.checked) {
          inputConvenio.disabled = true;
          inputConvenio.value = '';
        } else {
          inputConvenio.disabled = false;
        }
      });
    }
  });
  
 
