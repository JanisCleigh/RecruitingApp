public with sharing class PositionsListController {
    public List<Position__c> positions{get;set;}
    public String selectedStatus{get;set;}
       
    public PositionsListController(){
        positions = [SELECT Id, Name, Status__c, Max_Salary__c, Min_Salary__c, 
             Open_Date__c, Closing_Date__c FROM Position__c];
    }
        
    public void changeStatus(){ 
        getPositions();
    }
    
    public List<SelectOption> getPosStatus(){
        List<SelectOption> options = new  List<SelectOption>();
    Schema.DescribeFieldResult fieldDescription = Position__c.Status__c.getDescribe();
    List<Schema.PicklistEntry> positionStatusList = fieldDescription.getPickListValues();
    	for(Schema.PicklistEntry posStatus : positionStatusList) {
        	options.add(new SelectOption(posStatus.getLabel(), posStatus.getValue()));
    	}
        return options;
    }
    
    public List<Position__c> getPositions(){
          positions = [SELECT Id, Name, Status__c, Max_Salary__c, Min_Salary__c, 
             Open_Date__c, Closing_Date__c FROM Position__c WHERE Status__c LIKE :selectedStatus];
            return positions;
    }
       
    public PageReference save() {
            update positions;
        ApexPages.addMessage(new ApexPages.message(ApexPages.severity.CONFIRM,'Saved successfully!'));
                 return null;
    }
}