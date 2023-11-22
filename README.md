# furniture-store
MERN ecommerce furniture application

FIXME:
  - Filtro de busca em arrays dentro de um obj no mongoose para o filter do admin (https://mongoosejs.com/docs/api/model.html)
  - bug no protected route do layout public
  - bug no slider do product
  - colocar as dimensões das imagens pxs com hint de tipo e limite bytes
  - colocar slugify no cadastro do slug do produto
  - Fazer a validação do tempo da oferta para aplicar no produto
  - Colocar máscara no cartão de crédito
  - Filtro do history no order aggregation: https://stackoverflow.com/questions/38808154/mongodb-filter-on-value-of-the-last-element-in-an-array
  - Bug do reload na conta do customer
  - Refresh token: https://github.com/bhigoreduardo/react-app/blob/main/code-hero/schedule-app/client/src/libs/apis.ts
  - Bug no cash das informações do usuário (quando sair, resetar todos caches)
  - externalizar handleProduct(user, token, handleUpdateUser, endpoint, id) - [card-product/compare/wishlist/hero]
  - Se estiver no admin consertar bug dos compare, favorits
  - Refactor models extends and user type in users
  - Componentizar form tag button
  - Text rich está com bug no enter
  - Compare/Favoritos fazendo request sem user e token bug
  - Favorito está com bug de mais de 1 produto
  - Colocar as tags do produto para mecanismo de busca google e mostrar abaixo do produto
  - Colocar modal para confirmar exclusão

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

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {type: String, unique: true, required: true},
  passwordHash: {type: String, required: true},

  firstname: {type: String},
  lastname: {type: String},
  phone: {type: String}
});

// Extend function
const extend = (Schema, obj) => (
  new mongoose.Schema(
    Object.assign({}, Schema.obj, obj)
  )
);

// Usage:
const AdminUserSchema = extend(UserSchema, {
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  phone: {type: String, required: true}
});

const User = mongoose.model('users', UserSchema);
const AdminUser = mongoose.model('admins', AdminUserSchema);

const john = new User({
  email: 'user@site.com',
  passwordHash: 'bla-bla-bla',
  firstname: 'John'
});

john.save();

const admin = new AdminUser({
  email: 'admin@site.com',
  passwordHash: 'bla-bla-bla',
  firstname: 'Henry',
  lastname: 'Hardcore',
  // phone: '+555-5555-55'
});

admin.save();
// Oops! Error 'phone' is required

Dimensões:
	Categorias: 512*512
	Marcas: 512*512
	Produto Capa: 512*512
	Produto Galeria: 1200*960
  https://stackoverflow.com/questions/54020719/validating-file-size-and-format-with-yup