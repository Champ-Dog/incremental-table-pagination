This is a table pagination behaviour I cooked up while working on this <link to repo> tool. My motivation was a desire to show initial results to the user as quickly as possible (rendering them as they come), while managing larger sets of responses more elegantly than just adding them one-at-a-time to an increasingly large table.
I'd never tackled any kind of pagination before, so this seemed a little intimidating at first! But, I ended up having a lot of fun with this, and came up with something that worked well for my purposes.

I should preface this by saying that this is probably much better handled on the server-side, by breaking up the data into segments, sending the first set immediately, and sending other sets as they're requested. Basically, by creating the "pages" of results on the server, and sending them as they're needed.
But that wouldn't have given me the opportunity to learn something new and novel. If you'd like to understand how this "incremental pagination" works, read on!

First, we need to decide how many items we want to appear on each page of our table. In this case, it's set to 10. That means, for the first ten items we need to display, we should just render them on-screen straight away. But what about the next 10? This isn't as simple.

To show a "page" of results, we're telling our tool "display <Items Per Page> results, starting from *this* point." So what happens if there aren't enough items to show? We can't add them "as they come" like we did for the first ten, because we've told our tool that's it's rendering a provided set of results. So if there's only three more items to display, you'll see three items.
This is fine if there are only three more items, but what if there's more? By the time our user has finished working on the three results we just showed, there might be another whole page ready. Moving from a page of three items to one of ten isn't a great experience, and our user might not realise they need to go back to the previous page to see the missing results!

My solution to this was to only show a new page number when *there are enough new items to complete a page* OR the process is completed and there are "leftover" results that didn't fit on the last page. This way, I can be sure my users are only seeing full pages, or a single partial page as the last page, when it's certain there won't be more results to show. This means there's no chance a user could miss any of their results. I did this by including a simple *moreResults* true/false value as a parameter when I called the function. When this value is true, there's more to come; when it's false, results time is over! You can see in my code that the false value is sent with no result value, after the loop in *createSomeData* finishes; so I know there won't be any results left to process when that false value is passed, and the process can end.

The basic decision process looks like this:

```
Assess input
Is there more to come?
if no
    -> are there enough page numbers showing?
       if yes
        -> finish
       if no
           -> show a new page number
           -> finish
if yes 
    -> push the "result" part of the input to the array
    -> are there more results in the array than the "items per page" limit?
       if no
           -> render result immediately
       if yes
            -> are there enough results to fill a new page?
               if no
                   -> finish
               if yes
                   -> show a new page number
                   -> finish   
```