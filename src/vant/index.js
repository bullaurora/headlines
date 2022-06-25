// 需要使用的组件
import {
  Button,
  NavBar,
  Tabbar,
  TabbarItem,
  Col,
  Row,
  Image as VanImage,
  Cell,
  CellGroup,
  Icon ,
  Search ,
  List
} from 'vant'

// 通过install方法添加到实例中
const vant = {
  install(app) {
    app.use(Button)
    // app.use(Navbar);
    app.use(Tabbar)
    app.use(TabbarItem)
    app.use(NavBar)
    app.use(Col)
    app.use(Row)
    app.use(VanImage)
    app.use(Cell)
    app.use(CellGroup)
    app.use(Icon )
    app.use(Search )
    app.use(List )
  },
}

export default vant
