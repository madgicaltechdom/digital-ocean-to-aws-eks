# Use the webdevops/php-nginx image
FROM webdevops/php-nginx:7.4

ENV WEB_DOCUMENT_ROOT /app/public

# Set the working directory to /app
WORKDIR /app

# Copy the entire Laravel project to the container
COPY . /app

# Install Laravel dependencies
RUN composer install --no-interaction --optimize-autoloader

# Set the timezone
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN php artisan config:clear

RUN chown -R application:application .

# Expose ports 80 and 443
EXPOSE 80 443
