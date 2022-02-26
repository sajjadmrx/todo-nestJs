const jwtConstants = {
  secret: process.env.JWT_SECRET || "secret",
  signOptions: {
    expiresIn: "1d",
  }
}
export default jwtConstants;