# DEVTinder APIs

# AUTH ROUTER
-POST /signup
-POST /login
-POST /logout

# PROFILE ROUTER
-GET /profile/view
-PATCH /profile/edit
-PATCH /profle/password

# CONNECTION REQUEST ROUTER
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

# USER ROUTER
-GET /user/connections
-GET /user/requests/received
-GET /user/requests/sent
-GET /user/feed






Statuses :  Interested - Right Swipe
            Ignored - Left Swipe
            Accepted
            Rejected
