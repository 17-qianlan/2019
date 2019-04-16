# qqmusic

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目结构
```
├── dist                                        	// 打包后的目录
├── src
│   ├── assets                                    	// 资源
│   │    ├── js                      		        // js
│   │    │   ├── tooFn.js                			// 公共js函数
│   │    │   ├── Event.js               	        // Event
│   │    │   ├── Audio.js                           // Audio
│   │    │   └── classification.js              	// 歌曲的id
│   │    ├── css                     				// css
│   │    ├── fonts                     				// font
│   │    ├── media                    				// 媒体文件
│   │    └──  images                    			// 图片
│   ├── components                                	// 组件
│   │    ├── common                      			// 管理
│   │    │   ├── back-header                		// 顶部导航栏
│   │    │   ├── label               	    		// 顶部nav
│   │    │   ├── loading                    		// 加载
│   │    │   ├── menu-child                 		// 显示菜单列表的路由
│   │    │   ├── player-bar                 		// 底部播放条
│   │    │   ├── search-input               		// 搜索
│   │    │   ├── not              					// 404
│   │    │   └── show-song              			// 管理
│   │    ├── banner                     			// 轮播图
│   │    ├── header                     			// 头部组件
│   │    ├── menu-list                     			// 菜单的列表
│   │    ├── sidebar                   				// 歌单
│   │    └── song-list    
│   ├── view
│   │   ├── index                                 	// 首页
│   │   ├── player-pages                            // 播放页面
│   │   └── search-pages                            // 预搜索页面览页
│   ├── router.js                                  	// 路由
│   ├── store                                   	// 全局状态
│   │   ├── state                                 	// 首页
│   │   ├── mutations                               
│   │   ├── actions                                 
│   │   ├── getters 
│   ├── APP.vue                                   	
│   ├── main.js                                   	
│   └── utils                                  	    // 工具
└── vue.config.js                         			// vue配置拓展
```

#### 歌曲搜索页
- 使用组件传值的方式, 然后修改子组件引起父组件的值的变化, 实现重新请求并渲染
#### 歌曲的排行
- 和歌曲搜索页面的方式差不多, 都是通过修改子组件的值引起父组件的变化, 实现重新请求渲染

#### 懒加载

- 通过判断到底部的距离, 然后触发, 这是最简单的方法

- 但要注意在那个范围内会一直触发, 所以要保证每次就只可以触发一次

- 但是可以通过判断是否需要在某种条件下触发即可

  ```javascript
  if (this.isRequest) return false;
      const num = this.documentHeight - this.scrollTop;
      let boo =  num <= this.windowHeight + 200;
      if (/item\/search/ig.test(this.$route.fullPath) && boo) {
      this.isRequest = true;
      this.requestSearch(++this.p);
  } else {
  	this.songListId === '26' && this.requestTop(++this.topIndex);
  }
  ```

#### 播放

- 在主页APP哪儿就可以播放了, 这样可以很好的操作audio标签
- 可以省下不少代码的, 而且操作逻辑层很简单
- 最好建议封装一个Audio和Event的js, 这样在调用时, 简单粗暴

#### 遗留问题

- 歌词滚动出需要找到更好的时间来过渡歌词, 还有在切换页面后歌词就不会正常显示了
- 里边的组件如有不合理的地方, 比如懒加载和涉及搜索请求之类的几个函数, 写的不是合理, 但是现在已无能力修改了
- 需要注意一下自己的效率问题, 感觉有时候在写就像在混日子一样
- 注意在写的时候注释和笔记的重要性, 还有一定要在写之前做一个架构, **否则只会捡芝麻丢西瓜**