/*
 * 使用说明：
 * 本程序以完成固定宽度布局的网页在iPhone/Android设备上浏览时可以适配设备屏幕宽度(竖屏浏览, 暂未支持横屏浏览)
 * 为目的。正常运行的环境是: iPhone/Android设备的自带浏览器.
 * 在引入本程序后，请执行如下两步操作:
 * 1、对于js不能够正确获取到屏幕宽度的设备, 请使用
 *    adaptUILayout.regulateScreen.add(设备name, 设备userAgent字符串标示或正则, {
 *        width : 设备width,
 *        height : 设备height
 *    });
 *
 *    //Example:
 *    adaptUILayout.regulateScreen.add('I9100G', 'GT-I9100G', {
 *        width : 480,
 *        height : 800
 *    });
 * 录入设备屏幕尺寸, 以便程序可以正确的处理适配.
 * 也可以将已知设备的尺寸都录入程序.
 *
 * 2、使用如下代码启动适配
 *    adaptUILayout.adapt(布局宽度);
 *
 *    Example:
 *    adaptUILayout.adapt(480);
 *
*/
    var $ = require('jquery');
    var adaptUILayout;
    
    exports.adaptUILayout = (function(){
 
    //根据校正appVersion或userAgent校正屏幕分辨率宽度值
    var regulateScreen = (function(){
        var cache = {};
        
        //默认尺寸
        var defSize = {
            width  : window.screen.width,
            height : window.screen.height
        };
        
        var ver = window.navigator.appVersion;
        var s = window.orientation;
        var _ = null;
        
        var check = function(key){
            return key.constructor == String ? ver.indexOf(key) > -1 : ver.test(key);
        };
        
        var add = function(name, key, size){
            if(name && key)
                cache[name] = {
                    key : key,
                    size : size
                };
        };
        
        var del = function(name){
            if(cache[name])
                delete cache[name];
        };
        
        var cal = function(){
            if(_ != null)
                return _;
                
            for(var name in cache){
                if(check(cache[name].key)){
                    _ = cache[name].size;
                    break;
                }
            }
            
            if(_ == null)
                _ = defSize;
            
            return _;
        };
        
        return {
            add : add,
            del : del,
            cal : cal,
            s : s
        };
    })();
    

    //实现缩放
    var adapt = function(uiWidth){
        var 
        deviceWidth,
        devicePixelRatio,
        targetDensitydpi,
        //meta,
        initialContent,
        head,
        viewport,
        ua;

        ua = navigator.userAgent.toLowerCase();
        //whether it is the iPhone or iPad
        isiOS = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1;
    
        //获取设备信息,并矫正参数值
        devicePixelRatio = window.devicePixelRatio;
        devicePixelRatio < 1.5 ? 2  : devicePixelRatio;
        
        if(window.orientation == 0 || window.orientation == 180){
            $("#Rotation").hide();
            //$(".footer img").show();
            if(regulateScreen.s!=0){
                location.reload();
                if(regulateScreen.cal().width < regulateScreen.cal().height){
                    deviceWidth      = regulateScreen.cal().width; 
                }else{
                    deviceWidth      = regulateScreen.cal().height; 
                }
            }else{
                deviceWidth      = regulateScreen.cal().width; 
            }
        }else{
            $("#Rotation").show();
            //$(".footer img").hide();  
            if(regulateScreen.s!=0){
                $(function(){
                    $("#Rotation").show();  
                    //$(".footer img").show();
                });
                if(regulateScreen.cal().width > regulateScreen.cal().height){
                    deviceWidth      = regulateScreen.cal().width; 
                }else{
                    deviceWidth      = regulateScreen.cal().height; 
                }
            }else{
                deviceWidth      = regulateScreen.cal().height; 
            }
        }
        height = regulateScreen.cal().height;
        if(devicePixelRatio==2 && (deviceWidth==320 || deviceWidth==360 || deviceWidth==592 || deviceWidth==640)){
            deviceWidth*=2;
            height*=2;
        }
        if(devicePixelRatio==1.5 && (deviceWidth==320)){
            deviceWidth*=2;
            height*=2;
            devicePixelRatio = 2;
        }

        //获取最终dpi
        targetDensitydpi = uiWidth / deviceWidth * devicePixelRatio * 160;
        //use viewport width attribute on the iPhone or iPad device
        //use viewport target-densitydpi attribute on the Android device
        initialContent   = isiOS 
            ? 'target-densitydpi=device-dpi, width=' + uiWidth + 'px, user-scalable=no'
            : 'target-densitydpi=' + targetDensitydpi + ', width='+ uiWidth +', user-scalable=no';
        $("#viewport").remove();
        head = document.getElementsByTagName('head');
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.id = 'viewport';
        viewport.content = initialContent;
        head.length > 0 && head[head.length - 1].appendChild(viewport);
        //window.scrollTo(0, 0);
    }
    return {
        regulateScreen : regulateScreen,
        adapt : adapt
    };
})();