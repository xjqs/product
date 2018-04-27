define(function(require, exports, module) {
	require('jquery');
	return {
        test : function(requestModel) {
            return $.ajax({
                url : "../test.do",
                dataType : "json",
                data : requestModel,
            });
        }
    }
})