# Docker Deployment Guide

## Prerequisites
- Docker installed ([Download here](https://www.docker.com/products/docker-desktop))
- Docker Compose installed (comes with Docker Desktop)
- Git installed

## Local Docker Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/analystAdendi-arch/house-hunting-system.git
cd house-hunting-system
```

### Step 2: Build and Run with Docker Compose

```bash
# Build all services
docker-compose build

# Start all services (MongoDB, Backend, Frontend)
docker-compose up

# Or run in background
docker-compose up -d
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

### Step 3: Stop Services

```bash
# Stop all services
docker-compose down

# Remove volumes (WARNING: deletes database)
docker-compose down -v
```

## View Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Follow logs in real-time
docker-compose logs -f
```

## Production Deployment

### Deploy to AWS EC2

1. **Connect to EC2 instance**
```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

2. **Install Docker and Docker Compose**
```bash
# Update system
sudo yum update -y

# Install Docker
sudo amazon-linux-extras install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

3. **Clone and Deploy**
```bash
git clone https://github.com/analystAdendi-arch/house-hunting-system.git
cd house-hunting-system

# Update environment variables for production
nano backend/.env

# Start services
docker-compose up -d
```

### Deploy to DigitalOcean

1. **Create Droplet** with Docker pre-installed image
2. **SSH into Droplet**
```bash
ssh root@your-droplet-ip
```

3. **Clone and Deploy**
```bash
git clone https://github.com/analystAdendi-arch/house-hunting-system.git
cd house-hunting-system

# Update .env for production
nano backend/.env

# Start services
docker-compose up -d
```

### Deploy to Heroku (Alternative)

Create `heroku.yml`:
```yaml
build:
  docker:
    web: Dockerfile
run:
  web: node server.js
```

```bash
heroku login
heroku create your-app-name
heroku stack:set container
git push heroku main
```

## Production Environment Variables

Update `backend/.env`:

```env
# Server
PORT=5000
NODE_ENV=production

# Database (use managed MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/house-hunting

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

# API
API_URL=https://your-domain.com
FRONTEND_URL=https://your-domain.com
```

## Docker Compose Services

### MongoDB
- **Port**: 27017
- **Username**: admin
- **Password**: password
- **Volume**: mongodb_data (persistent storage)

### Backend
- **Port**: 5000
- **Health Check**: Every 30 seconds
- **Environment**: `NODE_ENV=development`

### Frontend
- **Port**: 3000
- **Server**: Nginx
- **Health Check**: Every 30 seconds

## Advanced Docker Commands

### Build specific service
```bash
docker-compose build backend
docker-compose build frontend
```

### Run specific service
```bash
docker-compose up backend
docker-compose up frontend
```

### Execute command in container
```bash
# Access backend container
docker-compose exec backend sh

# Run npm commands
docker-compose exec backend npm install package-name
```

### View container stats
```bash
docker stats
```

### Prune unused Docker resources
```bash
# Remove unused containers
docker container prune

# Remove unused images
docker image prune

# Remove all unused resources
docker system prune -a
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :3000
lsof -i :5000

# Kill process
kill -9 PID
```

### MongoDB Connection Issues
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Verify MongoDB is running
docker-compose exec mongodb mongo -u admin -p password
```

### Database Not Persisting
- Check if `mongodb_data` volume exists: `docker volume ls`
- Verify volume mount in docker-compose.yml

### Container Won't Start
```bash
# Check container logs
docker-compose logs service-name

# Rebuild container
docker-compose build --no-cache service-name
```

## Useful Docker Commands

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# View image layers
docker history image-name

# Remove all stopped containers
docker container prune

# Check disk usage
docker system df

# Update service (rebuild and restart)
docker-compose up -d --build
```

## Security Tips

1. **Change default MongoDB credentials** in docker-compose.yml
2. **Use strong JWT_SECRET** in production
3. **Use environment variables** for sensitive data
4. **Enable HTTPS** with SSL certificate
5. **Use managed MongoDB** (Atlas) instead of Docker MongoDB in production
6. **Set up firewall** to allow only necessary ports
7. **Regular backups** of MongoDB database

## Next Steps

After deployment:
1. ✅ Set up domain name
2. ✅ Configure SSL/HTTPS
3. ✅ Set up CI/CD pipeline (GitHub Actions)
4. ✅ Monitor application logs
5. ✅ Set up automated backups
6. ✅ Configure monitoring alerts

---

**Your application is now ready for production deployment!** 🚀
