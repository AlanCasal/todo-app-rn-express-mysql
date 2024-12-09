FROM node:18

WORKDIR /home/app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install expo

# Then copy the rest
COPY . .

EXPOSE 19006
EXPOSE 8081

CMD [ "npx", "expo", "start", "--web" ]



