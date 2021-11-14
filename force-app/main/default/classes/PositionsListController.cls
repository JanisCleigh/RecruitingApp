public with sharing class PositionsListController {
    List<Position__c> positions{get;set;}
    public String selectedStatus{get;set;}
    
    public void changeStatus(){ 
        getPositions();
    }
    
    public List<Position__c> getPositions(){
         if(selectedStatus=='All'){
             positions = [SELECT Id, Name, Status__c, Max_Salary__c, Min_Salary__c, 
             Open_Date__c, Closing_Date__c FROM Position__c];
         }
        else {
            positions = [SELECT Id, Name, Status__c, Max_Salary__c, Min_Salary__c, 
            Open_Date__c, Closing_Date__c FROM Position__c WHERE Status__c = :selectedStatus];
        }
    return positions;
    }   
   
    public PageReference save() {
            update positions;
                 return null;
    }
}