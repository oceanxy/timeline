
# timeline
## 时间展示轴

点击查看 [demo](http://www.xieyangogo.cn/timeline)

---

#### 注意事项：
* 发现bug或技术上的交流请发邮件到：[xyzsyx@163.com]()
* 本插件依赖jQuery库
* 本demo为本人早起所写，可能写法不适用于现在的框架页面，这里只是提供思路和效果
* 本插件根据 dom 结构自动初始化插件，未通过解析 json 数据的方式

-----
#### 使用方法：

1. 导入样式表
```HTML
    <link rel="stylesheet" type="text/css" href="./styles/index.css"></link>
```



2. 导入jquery库文件和autoTime.js
```HTML
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="./scripts/index.js"></script>
```



3. DOM
```HTML
    <div id="timeline" class="timeline">
        <ul class="timeline-con">
            <li class="year">
              <span class="shape shape-white"></span>
              <span class="text">2013年</span>
              <span class="shape"></span>
            </li>
            <li class="day">
              <span class="thing">第十七届中国国际光电产业博览会</span>
              <span class="text">4-6</span>
            </li>
        </ul>
    </div>
```

4. 调用 / 初始化
```javaScript
	new timeline()
```

---
