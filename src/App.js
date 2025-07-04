import { useState } from "react";
import axios from "axios";

function App() {
  
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);

  const buscar = async( ) =>{

    try{
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setEndereco(response.data);
    }catch(error){
      alert('ERROR 400 Pesquisa não encontrada', error);
      setEndereco(null);  
    }
  };

  const retornar = async()=> {
    setEndereco(null);
  }

  return(
<>
 
          {!endereco &&(

            <div>
              <div className="Card">
                <div className="Title">
               MeuLocal-ViaCep
                </div>
                <div className="Form">
                  <input
                   type="text"  
                    name='cep'
                    value={cep} 
                    onChange={(e)=>{
                    const value = e.target.value;
                    if (/^\d*$/.test(value))
                    setCep(value);
                    }}
                    id='cep' 
                    minLength='8' 
                    maxLength='8'
                    /><br/>
                  <input type="submit" onClick={buscar} value='Descobrir meu Local' className="Botao"/>
                </div>
              </div>
            </div>

          )}

      



     
{endereco &&(   
  <div>
    <div className="Card">
      <div className="Title">MeuLocal-ViaCep</div> 
      <div className="Title2">Você está em:</div>
      <ul className="Items">
      <li><strong>Cidade:</strong> {endereco.localidade}</li>
      <li><strong>UF:</strong> {endereco.uf}</li>
      <li><strong>Estado:</strong> {endereco.estado}</li>
      <li><strong>Bairro:</strong> {endereco.bairro}</li>
      <li><strong>Ruas:</strong> {endereco.logradouro}</li>
      <li><strong>Quadras:</strong> {endereco.complemento}</li>
      </ul>
      <button onClick={retornar} className="Botão">Realizar outra pesquisa</button>
    </div>
  </div>        
)}

</>
  );
}

export default App;
