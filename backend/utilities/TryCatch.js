
const TryCatch = (CacheHandler) => {
  return async(req,res,next)=>{
    try {
        await CacheHandler(req,res,next)
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
  }
}

export default TryCatch
