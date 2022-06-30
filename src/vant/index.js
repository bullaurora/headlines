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
  List,
  Field,
  Form,
  Toast,
  CountDown,
  Grid,
  GridItem ,
  Dialog ,
  Tab,
  Tabs,
  PullRefresh,
  Popup,
  ImagePreview,
  Loading,
  Divider,
  Picker,
  DatetimePicker 
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
    app.use(Field )
    app.use(Form )
    app.use(Toast )
    app.use(CountDown )
    app.use(Grid)
    app.use(GridItem)
    app.use(Dialog )
    app.use(Tabs)
    app.use(Tab)
    app.use(PullRefresh);
    app.use(Popup);
    app.use(ImagePreview);
    app.use(Loading);
    app.use(Divider);
    app.use(Picker);
    app.use(DatetimePicker );
  },
}

export default vant
