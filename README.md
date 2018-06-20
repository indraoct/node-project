# node-ajobthing
It is my simple API project with Node JS        
@author : Indra Octama      
@blog : https://indraoctama.com       

**DB design (MongoDB)**        
DB Name : ajobthing         

Collections :       
1. jobs   
   - id INT     
   - id_employer INT        
   - description   TEXT     
   - status (0:draft, 1:open, 2:close) INT      
   - created_date DATETIME      
   - updated_date DATETIME      
        
2. employers     
   - id INT            
   - name TEXT                        
   - company  TEXT        
      
3. frelancers
   - id INT     
   - name   TEXT    
   - points INT              
   
4. freelancer_jobs  
   - id INT     
   - id_freelancer INT  
   - id_job INT 
   - status INT (0:initial,1:submit,)
   - created_date DATETIME         
   - updated_date  DATETIME     
   - created_by TEXT
   - updated_by TEXT  
          

**How To run the application :**        

Go to the root path, then run this script:      
```
    node server.js

```
