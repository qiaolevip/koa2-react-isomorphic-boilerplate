/**
 * Created at 16/4/11.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import path from 'path'

const rootPath = path.join(__dirname, '../../..')
export default {
  rootPath,
  publicPath: '/public',
  staticPath: '/public/static',
  port: 3000,
  title: '点融社区',
  keywords: 'P2P网贷,P2P理财,点融网,点融网论坛',
  description: '点融网官方论坛每日为用户提供最新最热的P2P网贷理财话题，包括P2P网贷理财产品，P2P网贷投资经验，P2P行业最新动态，点融网官方讯息以及建议和投诉',
  db: {
    dialect: 'sqlite',
    username: '',
    password: '',
    database: 'main',
    storage: 'path/to/db.sqlite'
  }
}
