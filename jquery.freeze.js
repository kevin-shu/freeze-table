$.fn.fixTable=function(colNum, rowNum){
    colNum = colNum || 1;
    rowNum = rowNum || 0;
    
    var $wrapper = $("<div style='position:relative;'></div>");
    var $fixedColumn = this.clone().removeAttr("id").css("position","absolute");
    $wrapper.insertBefore(this);
    $wrapper.append($fixedColumn);
    $wrapper.append($("<div style='overflow:scroll;'></div>").append(this));
    
    $fixedColumn.find("tr").each(function(i,elem){
        $(elem).children().remove();
    });
    var wrapperWidth = 0;
    
    this.find("tr").each(function(i,row){
        var $fixedRow = $($fixedColumn.find("tr")[i])
        if(i<rowNum){
          
        } else {
            for(var j=0; j<colNum; j++){
                var $col = $(row.children[j]);
                var $newCol = $(row.children[j].cloneNode(true));
                $fixedRow.append($newCol);
                if(i==0){
                    wrapperWidth += $col.outerWidth()
                }
            }
        }
    });
    var pos = this.position();
    console.log(this);
    $fixedColumn.css("width",wrapperWidth).css("top",pos.top).css("left",pos.left);
}
