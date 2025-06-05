import {Router} from "express";

const rolesRoutes = Router();

rolesRoutes.get("/",(req, res)=>{
     res.status(200).send("get all roles routes")
})
rolesRoutes.get("/:id",(req, res)=>{
     res.status(200).send("get roles routes by id")
})
rolesRoutes.post("/",(req, res)=>{
     res.status(200).send("create roles routes")
})
rolesRoutes.put("/:id",(req, res)=>{
     res.status(200).send("update roles routes")
})
rolesRoutes.delete("/:id",(req, res)=>{
     res.status(200).send("delete roles routes")
})

export default rolesRoutes;
