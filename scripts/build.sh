docker build -t bdimg .
docker network create --subnet=119.18.0.0/16 mynet
# docker exec instancia3 bash -c "git pull; pm2 stop index.js; pm2 start index.js"
#PARA CONECTARSE A LA INSTANCIA
#docker exec -it instancia2 bash
#la p es de password la a es el valor


#OJO ESTO ES PARA ARRANCAR LA BD

#mysql -u root -p a -e "create database new_db; GRANT ALL PRIVILEGES ON new_db.* TO root@localhost IDENTIFIED BY 'a'"

#mysql -u root -pa
#mysql -u root -p a database_name < filename.sql