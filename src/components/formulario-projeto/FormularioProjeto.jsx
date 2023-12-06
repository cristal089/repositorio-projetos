import React, {useState} from "react";
import periodos from "../../../bd/periodos.json";
import disciplinas from "../../../bd/disciplinas.json";
import repositoriosPermitidos from "../../../bd/repositoriosPermitidos.json"
import axios from "axios";
import "./FormularioProjeto.css";


const FormularioProjeto = ({isEditing}) => {

    const [projectData, setProjectData] = useState({
        repositorio: '',
        grupo: '',
        matriculas: '',
        resumo: '',
        periodo: '',
        disciplina: '',
        avaliacoes: []
    });

    //Para mensagem de Feedback
    const [feedback, setFeedback] = useState("");

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProjectData({...projectData, [name]: value});
    };

    //Validação do Link do Repositório
    const repositorioValido = repositoriosPermitidos.some(({ regex }) => {
        const regexObj = new RegExp(regex);
        return regexObj.test(projectData.repositorio);
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
        //Verificando se algum dos dados não foi inserido.
      if (!projectData.repositorio || !projectData.grupo || !projectData.matriculas || !projectData.resumo || !projectData.periodo || !projectData.disciplina) {
        setFeedback("Por favor, preencha todos os campos.");
        return;
      } else if (!repositorioValido){ //Validando o Link do Repositório
          setFeedback("Por favor, insira um repositório válido");
          return;
        }
    
        try {
            let response;
            if (isEditing) { // <FormularioProjeto isEditing={true}/>
              response = await axios.put("http://localhost:3000/projetos/", projectData, {
                    repositorio: projectData.repositorio,
                    grupo: projectData.grupo,
                    matriculas: projectData.matriculas,
                    resumo: projectData.resumo,
                    periodo: projectData.periodo,
                    disciplina: projectData.disciplina,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                   });
            } else { // <FormularioProjeto isEditing={false}/>
                response = await axios.post("http://localhost:3000/projetos", {
                    repositorio: projectData.repositorio,
                    grupo: projectData.grupo,
                    matriculas: projectData.matriculas,
                    resumo: projectData.resumo,
                    periodo: projectData.periodo,
                    disciplina: projectData.disciplina,
                }, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
            }
          if (response.status === 200) {//Feedback "desnecessário", por isso console.log
            console.log(isEditing ? "Projeto editado com sucesso": "Projeto criado com sucesso", projectData);
          } else {
                setFeedback(`Não foi possível ${isEditing ? "editar" : "criar"} o projeto`);
            }
        } catch (error) {
            setFeedback(`Ocorreu um erro ao ${isEditing ? "editar" : "criar"} o projeto: ${error}`, error);
          }
    };

        //Adicionando campos para Notas
      const handleAddField = () => {
        if (calculaNotaFinal() < 10) {
          const novoCampo = {
            label: "",
            nota: 0.00, // Inicializando com duas casas decimais
            validado: false,
          };
    
          setProjectData({
            ...projectData,
            avaliacoes: [...projectData.avaliacoes, novoCampo],
          });
        } else {
          setFeedback(`A nota máxima já foi atingida, não é possível criar mais campos de notas!`);
        }
      };
    
      const handleFieldInputChange = (index, fieldName, fieldValue) => {
        const updatedavaliacoes = [...projectData.avaliacoes];
        
        if (fieldName === "nota") {
          fieldValue = parseFloat(fieldValue).toFixed(2);
        }
    
        updatedavaliacoes[index][fieldName] = fieldValue;
        setProjectData({
          ...projectData,
          avaliacoes: updatedavaliacoes,
        });
      };
    
      const calculaNotaFinal = () => {
        const totalGrade = projectData.avaliacoes.reduce((sum, evaluation) => {
          if (evaluation.validado) {
            return sum + parseFloat(evaluation.nota);
          }
          return sum;
        }, 0);
        const notaFinal = (totalGrade * 10).toFixed(2);
        return Math.min(notaFinal, 10);
      };

      const handleRemoveField = (index) => {
        const updatedavaliacoes = [...projectData.avaliacoes];
        updatedavaliacoes.splice(index, 1);
        setProjectData({
          ...projectData,
          avaliacoes: updatedavaliacoes,
        });
      };

    return (
        <>
            <div id="fundo-form">
                <h2>{isEditing ? "Editar Projeto" : "Criar Projeto"}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Repositório
                        <input 
                            type="text"
                            name="repositorio"
                            value={projectData.repositorio}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>Grupo
                        <input 
                            type="text"
                            name="grupo"
                            value={projectData.grupo}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>Matrículas
                        <input 
                            type="text"
                            name="matriculas"
                            value={projectData.matriculas}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>Breve Resumo(max.75 caracteres):
                        <input 
                            type="text"
                            name="resumo"
                            value={projectData.resumo}
                            onChange={handleInputChange}
                            maxLength={75}
                        />
                    </label>
                    <label>
                        Ano/Período
                        <select
                            name="periodo"
                            value={projectData.periodo}
                            onChange={handleInputChange}
                        >
                            {periodos.map((periodo)=> (
                                <option
                                    key ={periodo}
                                    value={periodo}
                                >
                                    {periodo}
                                </option>
                            ))}    
                        </select>    
                    </label>
                    <label>
                        Disciplina
                        <select 
                            name="disciplina"
                            value={projectData.disciplina}
                            onChange={handleInputChange}
                        >
                            {disciplinas.map((disciplina)=>(
                                <option
                                    key={disciplina.id}
                                    value ={disciplina.sigla}
                                >
                                    {disciplina.full_name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <h3>Avaliações</h3>
          {projectData.avaliacoes.map((field, index) => (
            <div className="avaliacao-container" key={index}>
              <label className="avaliacao-label">
                Feito
                <input
                  className="avaliacao-input"
                  type="text"
                  value={field.label}
                  onChange={(e) =>
                    handleFieldInputChange(index, "label", e.target.value)
                  }
                />
              </label>
              <label className="avaliacao-label nota">
                Nota
                <input
                  className="avaliacao-input"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={field.nota}
                  onChange={(e) =>
                    handleFieldInputChange(index, "nota", e.target.value)
                  }
                />
              </label>
              <label className="avaliacao-label inline">
                <input
                  className="avaliacao-input"
                  type="checkbox"
                  checked={field.validado}
                  onChange={(e) =>
                    handleFieldInputChange(index, "validado", e.target.checked)
                  }
                />
              </label>
              <button
                className="avaliacao-button"
                type="button"
                onClick={() => handleRemoveField(index) && setFeedback('')}
              >
               Remover
              </button>
            </div>
          ))}
          
            <button type="button" onClick={handleAddField}>
              Adicionar Nota
            </button>
          
          <p>Nota Final {calculaNotaFinal()}</p>
          {feedback && <div id="feedback">{feedback}</div>}
                    <button type="submit">{isEditing ? "Salvar Edição" : "Criar Projeto"}</button> 
                </form>
            </div>  
        </>
    );
};

export default FormularioProjeto;