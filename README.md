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
   - username TEXT          
   - password TEXT         
   - points INT              
   
4. freelancer_jobs  
   - id TEXT     
   - id_freelancer TEXT  
   - id_job INT 
   - status INT (0:initial,1:submit,2:completed)
   - created_date DATETIME         
   - updated_date  DATETIME     
   - created_by TEXT
   - updated_by TEXT  
          

**How To run the application :**        

Go to the root path, then run this script:      
```
    node server.js

```
