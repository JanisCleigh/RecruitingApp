@IsTest
private class PositionsListControllerTest {
    
    @TestSetup 
    static void setup(){
        
        Position__c position1 = new Position__c (Name = 'Name1', Status__c = 'Open', Max_Salary__c = 2000, Min_Salary__c = 500, 
                                                 Neccessary__c = 'Social', Open_Date__c = datetime.parse('17.11.2021, 14:30'), Closing_Date__c = datetime.parse('18.11.2021, 15:30'));
        insert position1;
        Position__c position2 = new Position__c (Name = 'Name2', Status__c = 'Closed', Max_Salary__c = 2000, Min_Salary__c = 500, Neccessary__c = 'Social');
        insert position2;
        Position__c position3 = new Position__c (Name = 'Name3', Status__c = 'Canceled', Max_Salary__c = 2000, Min_Salary__c = 500, Neccessary__c = 'Social');
        insert position3;
        Position__c position4 = new Position__c (Name = 'Name4', Status__c = 'Pending', Max_Salary__c = 2000, Min_Salary__c = 500, Neccessary__c = 'Social');
        insert position4;
        Position__c position5 = new Position__c (Name = 'Name5', Status__c = 'Open', Max_Salary__c = 2000, Min_Salary__c = 500, Neccessary__c = 'Social');
        insert position5;
	}
    
  	@IsTest
    static void GetPositionsTest() {
               
        PositionsListController pageController = new PositionsListController();
        System.assertEquals(5, pageController.positions.size());
        List <Position__c> allPositions = [SELECT Id, Name, Status__c, Max_Salary__c, Min_Salary__c, 
             Open_Date__c, Closing_Date__c FROM Position__c];
        System.assertEquals(allPositions, pageController.positions);
    }
    
    @IsTest
    static void OnChangeOpenTest() {
        PositionsListController pageController = new PositionsListController();
      	pageController.selectedStatus = 'Open';
        pageController.changeStatus();
        System.assertEquals(2, pageController.positions.size());
        List <Position__c> allPositions = [SELECT Name, Status__c, Max_Salary__c, Min_Salary__c, 
             Open_Date__c, Closing_Date__c FROM Position__c WHERE Status__c LIKE 'Open'];
        System.assertEquals(allPositions, pageController.positions);
}
    @IsTest
    static void GetPosStatusTest(){
      PositionsListController pageController = new PositionsListController();
      List <SelectOption> soList = pageController.getPosStatus();
      List<Schema.PicklistEntry> ple = Position__c.Status__c.getDescribe().getPickListValues();
      System.assertEquals(ple.size(), soList.size());
}
     @IsTest
    static void SaveTest(){
      PositionsListController pageController = new PositionsListController();
      pageController.selectedStatus = 'Open';
      pageController.changeStatus();
        for(Position__c pos : pageController.positions){
            pos.Status__c = 'Closed';
      }
      pageController.save();
      System.assertEquals(5, pageController.positions.size());
      List <Position__c> openPositionsList = [SELECT Id, Name, Status__c, Max_Salary__c, Min_Salary__c, 
           Open_Date__c, Closing_Date__c FROM Position__c WHERE Status__c = 'Closed'];
           System.assertEquals(3, OpenPositionsList.size());
           
    }
    
}