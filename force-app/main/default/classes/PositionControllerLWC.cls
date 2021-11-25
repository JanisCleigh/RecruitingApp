public with sharing class PositionControllerLWC {
    @AuraEnabled(cacheable = true)
    public static List<Position__c> getAllPositions(String selectedStatus, Integer numberOfRecords ){
       return [SELECT Id, Name, Status__c, Max_Salary__c, Min_Salary__c, 
        Open_Date__c, Closing_Date__c FROM Position__c WHERE Status__c LIKE :selectedStatus LIMIT :numberOfRecords ];    
    }
}

   