class User < ApplicationRecord
    has_many :likes
    has_many :comments
    
    # has_many :liked_posts, foreign_key: :post_id, class_name: "Like"
    # has_many :posts, through: :liked_posts, source: :post
    
    # has_many :commented_posts, foreign_key: :post_id, class_name: "Comment"
    # has_many :posts, through: :commented_posts, source: :
    
    
    
    # Will return an array of follows for the given user instance
    has_many :received_messages, foreign_key: :sender_id, class_name: "Message"
    # Will return an array of users who follow the user instance
    has_many :receivers, through: :received_messages, source: :receiver
    
    #####################
    
    # returns an array of follows a user gave to someone else
    has_many :sent_messages, foreign_key: :receiver_id, class_name: "Message"
    # returns an array of other users who the user has followed
    has_many :senders, through: :sent_messages, source: :sender

    has_secure_password
end

# has_many :tasks
# has_many :assigments, :through => :tasks
# has_many :users, :through => :assignments

    # has_many :friendships
    # has_many :friends, through: :friendships

    # has_many :comments
    # has_many :friends_comments, through: :friends, source: :comments