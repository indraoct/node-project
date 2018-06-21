# node-ajobthing
It is my simple API project with Node JS        
@author : Indra Octama      
@blog : https://indraoctama.com       

**DB design (MongoDB)**        
DB Name : ajobthing         

Collections :       
1. jobs   
   - id TEXT     
   - id_employer TEXT        
   - description   TEXT     
   - status (0:draft, 1:open, 2:close) INT      
   - created_date DATETIME      
   - updated_date DATETIME      
        
2. employers     
   - id TEXT            
   - name TEXT                        
   - company  TEXT        
      
3. freelancers
   - id TEXT           
   - name   TEXT         
   - email TEXT               
   - password TEXT      
   - token TEXT              
   - points INT              
   
4. freelancer_jobs  
   - id TEXT     
   - email_freelancer TEXT  
   - id_job INT 
   - status INT (0:initial,1:submit,2:completed)        
   - created_date DATETIME          
   - updated_date  DATETIME         
   - created_by TEXT        
   - updated_by TEXT        
   
**Business Flow**

1. Employer Insert data Jobs 
   ```
        HTTP POST       
        http://localhost:8888/insertjob     
        
        param :
        - id_employer   
        - description       
        - status (0=draft;1=publish)        

   ```      
2. Employer can update the status of the job
   ```
        HTTP PUT        
        http://localhost:8888/updatejobstatus/{id_jobs}         
        param :
        - status  (0=draft;1=publish)         

   ``` 

3. Freelancer can see the job list (job with status = publish)
    ```
        HTTP GET 
        http://localhost:8888/getalljobs        
  
    ```     
    
4. Freelancer can register to MX100 apps        
    ```
        HTTP POST
        http://localhost:8888/userregister      
        param :
        - name  
        - email 
        - password
        - password_confirmation         

    ```

5. Freelancer can login to MX100 apps (get token)
    ```
        HTTP POST
        http://localhost:8888/userlogin      
        param :
        - email 
        - password       
    
    ```

6. Freelancer can initiate do the jobs (status job : initialized)
    ```
        HTTP POST   
        http://localhost:8888/initjob       
        header :        
        - token     
           
        param :     
        - email         
        - id_job             
    
    ```

7. Freelancer can submit the application for the jobs (status job : submited) --> point -2
    ```
        HTTP POST
        http://localhost:8888/submitjob
        - token     
                   
        param :     
        - email         
        - id_job  
        

    ```

8. Employer can update status work is completed (status job : completed)
    ```
        HTTP POST   
        http://localhost:8888/completedjob  
        param :
        - id_employer
        - email     
        - id_job              
    ```
          

**How To run the application :**        

install dependencies :
```
    npm install md5
    npm install crypto-browserify@3.11.0  
    npm install valid-objectid

```

Go to the root path, then run this script:      
```
    node server.js

```
