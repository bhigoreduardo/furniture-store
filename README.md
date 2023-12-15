# furniture-store
MERN ecommerce furniture application

FIXME:
  - Filtro de busca em arrays dentro de um obj no mongoose para o filter do admin (https://mongoosejs.com/docs/api/model.html)
  - bug no slider do product
  - colocar as dimensões das imagens pxs com hint de tipo e limite bytes
  - Fazer a validação do tempo da oferta para aplicar no produto
  - Colocar máscara no cartão de crédito
  - Filtro do history no order aggregation: https://stackoverflow.com/questions/38808154/mongodb-filter-on-value-of-the-last-element-in-an-array
  - Bug do reload na conta do customer
  - Refresh token: https://github.com/bhigoreduardo/react-app/blob/main/code-hero/schedule-app/client/src/libs/apis.ts
  - Bug no cash das informações do usuário (quando sair, resetar todos caches)
  - externalizar handleProduct(user, token, handleUpdateUser, endpoint, id) - [card-product/compare/wishlist/hero]
  - Se estiver no admin consertar bug dos compare, favorits
  - Componentizar form tag button
  - Text rich está com bug no enter
  - Colocar as tags do produto para mecanismo de busca google e mostrar abaixo do produto
  - Colocar modal para confirmar exclusão
  - Código provisório de orders analytics no dashboard do customer
  - Rever todos refetch
  - Na oferta quanto for escolhido para todos produtos colocar condição na validação do formik
  - Erro da remoção da imagem do servidor está crashando a aplicação tem que ser resolvido com urgência
  - Consertar _id do products do put
  - bug do protect route de maintenance
  - req.body.status === StatusEnum.Canceled devolver estoque

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

Dimensões:
	Categorias: 512*512
	Marcas: 512*512
	Produto Capa: 512*512
	Produto Galeria: 1200*960
  https://stackoverflow.com/questions/54020719/validating-file-size-and-format-with-yup

Quick scripts:
- Loja:
  db.stores.insert({_type:"store",name:"Furniture",email:"furniture@email.com",whatsApp:"12345678901",activatedStatus:false})