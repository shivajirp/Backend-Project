// Method 2 : promises (.resolve, .catch)
const asyncHandler = (requestHandler) => { (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
    .catch( (err) => next(err) )
} }

export { asyncHandler }




//Method 1 : try-catch way

// const asyncHandler = (fn) => { async (req, res, next) => {
//     try{
//         await fn(req, res, next)
//     } catch (error) {
//         res.send(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }

// }}