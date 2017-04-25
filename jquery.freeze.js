$.fn.freeze=function(colNum, rowNum){
    this.each( function(){
        var $this = $(this);
        colNum = colNum || 1;
        rowNum = rowNum || 0;

        var $wrapper = $("<div style='position:relative;overflow-y:hidden'></div>");
        var $fixedColumn = $this.clone().removeAttr("id").css("position","absolute");
        $wrapper.insertBefore($this);
        $wrapper.append($fixedColumn);
        $wrapper.append($("<div style='overflow-x:auto;'></div>").append($this));

        $fixedColumn.find("tr").each(function(i,elem){
            $(elem).children().remove();
        });
        var wrapperWidth = 0;

        $this.find("tr").each(function(i,row){
            var $fixedRow = $($fixedColumn.find("tr")[i]);
            if(i<rowNum){

            } else {
                for(var j=0; j<colNum; j++){
                    var $col = $(row.children[j]);
                    var $newCol = $(row.children[j].cloneNode(true));
                    $fixedRow.append($newCol);
                    if(j===0){
                        $newCol.outerHeight($col.outerHeight());
                    }
                    if(i===0){
                        $newCol.outerWidth($col.outerWidth());
                        wrapperWidth += $col.outerWidth();
                    }
                }
            }
        });
        var pos = $this.position();
        $fixedColumn.css("width",wrapperWidth).css("top",pos.top).css("left",pos.left);
    });
};
