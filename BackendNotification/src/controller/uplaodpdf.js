const uploadpdf = async (req,res)=>{
try{

    const {pdf} = req.file;

    const {email} = req.body;




    console.log(pdf);
    console.log(email);

    res.status(200).json({
        success:true,
        message:"pdf uploaded successfully",
        
    })


}catch(error)
{
    console.log(error);
    res.status(500).json({
        success:false,
        message:"Internal server error"
    })
}
  



}



export {uploadpdf};