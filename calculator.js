let calculation=JSON.parse(localStorage.getItem('calculation')) || '0';
    let justEvaluated = true;
    let lastIsOperator = false;
    console.log(calculation);
    document.querySelector('.js-expression').innerHTML = `${calculation}`;

    function updateCalculation(entry){

      const operators = ['+','-','*','/'];
      if(entry === '='){
        if(lastIsOperator === true){
          alert('Invalid format used');
        }
        else{
        calculation= eval(calculation).toString();
        justEvaluated = true;
        lastIsOperator = false;
        }
      }
      else if(entry === 'C'){
        calculation = '0';
        justEvaluated = true;
        localStorage.removeItem('calculation');
        lastIsOperator = false;
      }
      else if(entry === 'del'){
        if (lastIsOperator === true) calculation = calculation.slice(0, -3);
        else calculation = calculation.slice(0, -1);
        justEvaluated = false;
        lastIsOperator = false;
      }      
      else{
        if(justEvaluated && !operators.includes(entry)){
          calculation = entry;
          justEvaluated = false;
          lastIsOperator = false;
        }
        else{
          if(operators.includes(entry)){
            if(lastIsOperator === true){
              calculation = calculation.slice(0, -3);
              lastIsOperator = true;
            }
            calculation+= ' '+entry+' ';  
            lastIsOperator = true;
          }
          else{
            calculation += entry;
            
            lastIsOperator = false;
          }
          justEvaluated = false;
        }
        
      }
      localStorage.setItem('calculation',JSON.stringify(calculation));

      if(entry === '='){
        document.querySelector('.js-expression').style.color = 'rgb(79, 192, 18)';
      }
      else{
        document.querySelector('.js-expression').style.color = 'white';
      }

      console.log(calculation);
      document.querySelector('.js-expression').innerHTML = `${calculation}`;
    }