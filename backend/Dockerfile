FROM node:18.16

# Create app directory
WORKDIR /var/app

# Install app dependencies
COPY . /var/app
RUN yarn

# Expose application port
EXPOSE 7000

# Docker entrypoint
RUN chmod 777 /var/app/docker-entrypoint.sh
ENTRYPOINT ["sh", "/var/app/docker-entrypoint.sh" ]