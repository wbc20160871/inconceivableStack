var  jq=jQuery.noConflict();
 jq(function(jq){

    // 占位符项目来填充列表的功能
    function populate(container, count, offset){
        var output = '';
        offset = isNaN(offset) ? 0 : offset;
        for(var i = 0; i<count; i++ ){
            output += '<li>'+(offset+i)+'</li>';
        }
        return jq(output).appendTo(container);
    }

    // 填充列表项
    jq('ul[data-items]').each(function(i,e){
        var items = parseInt(jq(e).data('items'), 10);
        populate(e, items);
    });

    // 主要调用部分
    jq(document).on('activated',function(event){
        var jqsection = jq(".scrollbox");
        var jqframe = jqsection.find('.frame'),
            jqul = jqframe.find('ul').eq(0),
            jqscrollbar = jqsection.find('.scrollbar'),
            jqbuttons = jqsection.find('.controlbar [data-action]');
        
        populate(jqul, 10);
            
        // 控制
        jqbuttons.on('click',function(e){
            var action = jq(this).data('action');
            switch(action){
                case 'reset':
                jqframe.sly('toStart');
                setTimeout(function(){
                    jqul.find('li').slice(10).remove();
                    jqframe.sly('reload');
                }, 200);
                break;
                default:
                jqframe.sly(action);
            }
        });
        
        jqsection.find(".slyWrap").each(function(i,e){
            var cont = jq(this),
                frame = cont.find(".sly"),
                slidee = frame.find("ul"),
                scrollbar = cont.find(".scrollbar"),
                pagesbar = cont.find(".pages"),
                options = frame.data("options"),
                controls = cont.find(".controls"),
                prevButton = controls.find(".prev"),
                nextButton = controls.find(".next"),
                prevPageButton = controls.find(".prevPage"),
                nextPageButton = controls.find(".nextPage");

            options = jq.extend({},options,{
                scrollBar: scrollbar,
                pagesBar: pagesbar,
                prev: prevButton,
                next: nextButton,
                prevPage: prevPageButton,
                nextPage: nextPageButton,
                disabledClass: 'btn-disabled'
            });

            frame.sly( options );

            cont.find("button").click(function(){
                var action = jq(this).data('action'),
                arg = jq(this).data('arg');
                switch(action){
                    case 'add':
                    slidee.append(slidee.children().slice(-1).clone().removeClass().text(function(i,text){
                        return text/1 + 1;
                    }));
                    frame.sly('reload');
                    break;
                    case 'remove':
                    slidee.find("li").slice(-1).remove();
                    frame.sly('reload');
                    break;
                    default:
                    frame.sly(action, arg);
                }
            });

        });
    
    }).trigger('activated');
    
});
