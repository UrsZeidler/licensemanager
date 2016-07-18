
//test class
function TestLicenseManager(contract) {
	
	this.test_instance = contract;
	this.prefix='';
	this.messageBlockId = "restResult";
	var self = this;

	this.allTests=function(){
		this.testAttributes();
		this.testOperation1();
		
	}
	
	
	this.printTest=function(testName,testMessage,state){
		var e = document.getElementById(this.prefix+'-'+this.messageBlockId);
		var elemDiv = document.createElement('div');
		elemDiv.id= this.prefix+'-'+testName;
		elemDiv.value = testMessage;
		if(!state)
			elemDiv.class = 'failed-state'
		e.appendChild(elemDiv);
	}
	
	this.testAttributes=function() {
		
		//test attribtes
		
		
		
		//
	}

	//Test for operation1
	this.testOperation1=function() {
		
		//test operation1
		var res = this.test_instance.operation();
		state success = res==="";
		
		this.printTest("testOperation1", "", state);		
		//
	}
	

}

