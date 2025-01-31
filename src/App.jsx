import axios from "axios";
import { useState } from "react";

const App = () => {
  const [cpfcnpj, setCpfCnpj] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  

  const formatCpfCnpj = (value) => {
  
    value = value.replace(/\D/g, "");

    if (value.length <= 11) {
      
      return value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      
      return value
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,4})/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
  };
  const handleInputChange = (e) => {
    const formattedValue = formatCpfCnpj(e.target.value);
    setCpfCnpj(formattedValue);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    const formData = new FormData();
    formData.append("cpfcnpj", cpfcnpj);
  
    try {
      const response = await axios.post("/api/generate-pdf/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", 
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "declaracao.pdf"); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("Nenhum dado encontrado para o CPF/CNPJ fornecido.");
      } else {
        setErrorMessage("Erro ao gerar o PDF. Tente novamente mais tarde.");
      }
      console.error("Erro ao gerar o PDF:", error);
    }finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="form-principal">
      <div className="paragraph-title">
        <p className="quantity-two">Gerar o demonstrativo de pagamentos realizados em 2024</p>
      </div>
      <form className="form-style" onSubmit={handleSubmit}>
        <div className="form-cpf">
          <label className="label-main">CPF/CNPJ:</label>
          <div className="input-cpf">
            <div className="input-main">
              <input
                className="input-text"
                aria-invalid="false"
                autoFocus
                type="text"
                placeholder="Digite aqui"
                value={cpfcnpj}
                onChange={handleInputChange}
                maxLength={18} 
                disabled={isLoading}
              />
            </div>
          </div>
          <p className="paragraph-info"> * Exemplo: 123.456.789-00 ou 123.456.78/0001-99</p>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <button className="button-send" disabled={isLoading} type="submit">
         {isLoading ? "Gerando..." : "Gerar Demonstrativo"} {/* Texto condicional */}
        </button>
        {isLoading && <div className="loading-spinner"></div>} {/* Bolinha de carregamento */}
        <p className="loading-message">
            Se for necessária alguma correção, envie sua solicitação por e-mail
            para
            <a href="mailto:financeiro@inml.com.br"> financeiro@inml.com.br</a>
        </p>
        
      </form>
    </div>
  );
};

export default App;
