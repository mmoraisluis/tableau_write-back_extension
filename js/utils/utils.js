var Utils = (function(){

    return {
        createButton: function(buttonTitle) {
            const button =
            $(`<button type='button' class='btn btn-default btn-block'>
              ${buttonTitle}
            </button>`);
        
            return button;
        },

        dataTableToJson:function(dataTable){
            // Build Json With DataTable Data
            var jColumns=[];
            var jData = [];
            var columns = dataTable.settings().init().columns;
            var rows = dataTable.data().toArray();
            dataTable.columns().every(function(index) {
            jColumns.push(columns[index].title);
            })
            for ( var i = 0; i < rows.length; i ++ )
            {
            var data = {};
            for(var j = 0; j < jColumns.length; j++){
                data[jColumns[j]] = rows[i][j];
            }
            jData.push(data);
            }
            var json = {
            columns : jColumns,
            data : jData
            }

            return json;
        },

        dataTableColumns:function(dataTable){
            var jColumns=[];
            var columns = dataTable.settings().init().columns;
            dataTable.columns().every(function(index) {
            jColumns.push(columns[index].title);
            })

            return jColumns;
        },

        findMeasures: function(columns){
            var measureIndex = [];
            for(var i = 0; i < columns.length; i++){
                var regex = /^[A-Z]*\((.*)\)$/g;
                if(!/^ATTR\((.*)\)$/g.exec(columns[i].title)){
                    var match = regex.exec(columns[i].title);
                    if(match != null){measureIndex.push(i)}
                }
            }

            return measureIndex;
        },

        renameATTR: function(columns){
            var clm = columns;
            for(var i = 0; i < columns.length; i++){
                var regex = /^ATTR\((.*)\)$/g
                var match = regex.exec(columns[i].title);
                if(match != null){clm[i].title = match[1]}
            }

            return clm;
        },

        removeMeasuresColumns: function(measureIndex, inputArray){
            var outputArray = [];
            for (var i = 0; i < inputArray.length; i++){
                if(measureIndex.indexOf(i)== -1){
                    outputArray.push(inputArray[i])
                }
            }
            return outputArray;
        },

        removeMeasuresData: function(measureIndex, inputArray){
            var outputArray = [];
            for (var d = 0; d < inputArray.length; d++){
                var inputdata = inputArray[d];
                var outputdata = [];
                for (var i = 0; i < inputdata.length; i++){
                    if(measureIndex.indexOf(i)== -1){
                        outputdata.push(inputdata[i])
                    }
                }
                outputArray.push(outputdata);
            }

            return outputArray;
        },

        removeDuplicatedColumns: function(dataColumns, xColumns){
            for(var i = 0; i < xColumns.length; i++){
                var index = dataColumns.findIndex(obj => obj.title === xColumns[i]);
                if (index !== -1) dataColumns.splice(index, 1);
            }

            return dataColumns;
        }
    }
   
   }())