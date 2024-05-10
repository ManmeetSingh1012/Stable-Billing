export default function Feedback() {

 return(

   <div className="w-full">


<div class="max-w-xl mx-auto">
  <div class="mx-auto max-w-2xl">
    <div class="text-center">
      <h2 class="text-xl text-gray-800 font-bold sm:text-3xl mt-5">
        Ask for Help/Post a Feedback
      </h2>
    </div>

    <div class="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10">
      <form>
        <div class="mb-4 sm:mb-8">
          <label for="hs-feedback-post-comment-name-1" class="block mb-2 text-sm font-medium">Full name</label>
          <input type="text" id="hs-feedback-post-comment-name-1" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Full name"></input>
        </div>

        <div class="mb-4 sm:mb-8">
          <label for="hs-feedback-post-comment-email-1" class="block mb-2 text-sm font-medium">Email address</label>
          <input type="email" id="hs-feedback-post-comment-email-1" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Email address"></input>
        </div>

        <div>
          <label for="hs-feedback-post-comment-textarea-1" class="block mb-2 text-sm font-medium">Comment</label>
          <div class="mt-1">
            <textarea id="hs-feedback-post-comment-textarea-1" name="hs-feedback-post-comment-textarea-1" rows="3" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Leave your comment here..."></textarea>
          </div>
        </div>

        <div class="mt-6 grid">
          <button type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Submit</button>
        </div>
      </form>
    </div>
    
  </div>
</div>



   </div>
 )
}