# remove the container if exists or running
if [ $( docker container ls -q -a --filter name=server_c) != '' ]; then
      docker container stop server_c
     docker container rm server_c
fi

# remove the image if exists
if [ $( docker image ls -q --filter reference=server_image) != '' ]; then
     docker image rm server_image
fi

# build the image
 docker build -t server_image .

# start the container
 docker run -itd -p 4000:4000 --name server_c server_image
