public with sharing class PositionControllerLWC {
    @AuraEnabled
    public static List<Position__c> getAllPositions(String selectedStatus, Integer offsetPositions, Integer positionsOnPage){
       return [SELECT Id, Name, Status__c, Max_Salary__c, Min_Salary__c, 
        Open_Date__c, Closing_Date__c FROM Position__c WHERE Status__c LIKE :selectedStatus LIMIT :positionsOnPage OFFSET :offsetPositions];    
    }
    
   @AuraEnabled
    public static Integer getTotalNumberOfPositions(String selectedStatus){
        return [SELECT COUNT() FROM Position__c WHERE Status__c LIKE :selectedStatus];
    }

    @AuraEnabled
    public static void updatePositions(List <Position__c> posList) {

        update posList; 
       
    }

}

   