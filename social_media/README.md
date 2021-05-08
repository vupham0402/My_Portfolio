# Social Media Module For Drupal Website

## What user do:
    - User can add/edit/delete the link for the social media they want

## What module do:
    - Create the list of social media icons based on the user's request and show it on drupal website
    - Saved all social media links in database

## Preparing for module:
    - social_media.info: to store data about themes and information of module and control module operation
        + name = Social Media Section
        + description = Create a list of social media icons and show it on website
        + package = Social Media
        + core = 7.x
        + stylesheets[all][] = social_media.css
        + scripts[] = clickButton.js
        + file[] = social_media.module  
        + configure = admin/config/services/Social Media
    
    - social_media.module: code to run the module 
        + function social_media_menu(): Configuration for Social Media module
        + function social_media_form(): Create the form for user can input
        + function social_media_block_info(): Create a block for module
        + function social_media_form_validate(): Validating the data
        + function social_media_get_value(): Create the HTML code (<a> tag) using the value get from client input form
        + function social_media_block_view(): Show the list of social media based on user input form
    
    - social_media.install: store the url links of client by database table
        + id column: id for social media link
        + url column: link of social media

## Acceptance Criteria
    - User
        + User can access the socia media admin screen
        + User can add/edit/delete the url of social media
        + User can save configuration
    - Module 
        + Only accept well-form urls
        + Show all the icons of social media user requested
        + All the url links work well
        + Display all icons of social media vertically with the width of screen > 1024 px
        + Display all icons of social media horizontally with the width of screen < 1024 px

## Photo Demo
    - https://www.flickr.com/photos/192965310@N06/51164017217/in/datetaken-public/
    - https://www.flickr.com/photos/192965310@N06/51164017217/in/datetaken-public/
  
## Video Demo
    - https://vimeo.com/546775198

## Website Demo
    - https://www.cwu.edu/gearup/

 


    
