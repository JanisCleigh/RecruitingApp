public with sharing class PositionsListController {
    public List<Position__c> getPositions() {
    List<Position__c> results = Database.query(
        'SELECT Id, Name, Status__c, Max_Salary__c, Min_Salary__c, Open_Date__c, ' +
        'Closing_Date__c FROM Position__c');
    return results;
}
}