# furniture-store
MERN ecommerce furniture application

FIXME:
  - Se estiver no admin consertar bug dos compare, favorits
  - Fazer a validação do tempo da oferta para aplicar no produto
  - req.body.status === StatusEnum.Canceled devolver estoque
  - Componentizar form tag button
  - Colocar modal para confirmar exclusão
  - Na oferta quanto for escolhido para todos produtos colocar condição na validação do formik
  - Erro da remoção da imagem do servidor está crashando a aplicação tem que ser resolvido com urgência

  - Colocar as tags do produto para mecanismo de busca google e mostrar abaixo do produto
  - Consertar _id do products do put
  - Filtro do history no order aggregation: https://stackoverflow.com/questions/38808154/mongodb-filter-on-value-of-the-last-element-in-an-array
  - Filtro de busca em arrays dentro de um obj no mongoose para o filter do admin (https://mongoosejs.com/docs/api/model.html)
  - Código provisório de orders analytics no dashboard do customer
  - bug no slider do product
  - Bug do reload na conta do customer
  - bug do protect route de maintenance
  - Bug no cash das informações do usuário (quando sair, resetar todos caches)
  - Refresh token: https://github.com/bhigoreduardo/react-app/blob/main/code-hero/schedule-app/client/src/libs/apis.ts
  - externalizar handleProduct(user, token, handleUpdateUser, endpoint, id) - [card-product/compare/wishlist/hero]
  - Text rich está com bug no enter
  - Rever todos refetch

TODO:
  - Condições de loja no ar:
    Cadastro : categorias, marcas, cores, produtos
    Informações da loja
    Definição do layout

    Sobre
Ajuda
Produto:
	Avaliação
	Relacionados
Produtos
Admin Pedidos:
	Alterar status
Dashboard Cliente:
	Histórico
	Imagem de usuário
	Avaliação
Home
Header Todos Produtos

Quick scripts:
- Loja:
  db.stores.insert({_type:"store",name:"Furniture",email:"furniture@email.com",whatsApp:"12345678901",activatedStatus:false})