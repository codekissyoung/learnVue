package main

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Response 通用响应结构
type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

// SayHelloRequest 请求结构
type SayHelloRequest struct {
	Name string `json:"name" binding:"required"`
}

// SayHelloResponse 响应结构
type SayHelloResponse struct {
	Greeting  string `json:"greeting"`
	Timestamp string `json:"timestamp"`
	From      string `json:"from"`
}

func main() {
	// 创建gin路由器
	r := gin.Default()

	// 配置CORS中间件 - 允许任意请求访问
	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true, // 允许所有域名访问
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false, // 允许所有域名时必须设为false
		MaxAge:           12 * time.Hour,
	}))

	// API路由组
	api := r.Group("/api/v1")
	{
		// GET方式的SayHello
		api.GET("/hello", SayHelloGET)
		
		// POST方式的SayHello
		api.POST("/hello", SayHelloPOST)
		
		// 获取用户信息示例
		api.GET("/user/:id", GetUser)
		
		// 健康检查接口
		api.GET("/health", HealthCheck)
	}

	// 启动服务器
	port := ":8080"
	gin.DefaultWriter.Write([]byte("🚀 Go Gin API服务器启动中...\n"))
	gin.DefaultWriter.Write([]byte("📍 服务地址: http://localhost" + port + "\n"))
	gin.DefaultWriter.Write([]byte("🔗 API文档: http://localhost" + port + "/api/v1/health\n"))
	gin.DefaultWriter.Write([]byte("🌐 支持跨域: 允许任意域名访问\n\n"))
	
	r.Run(port)
}

// SayHelloGET GET方式的问候接口
func SayHelloGET(c *gin.Context) {
	name := c.DefaultQuery("name", "World")
	
	response := Response{
		Code:    200,
		Message: "success",
		Data: SayHelloResponse{
			Greeting:  "Hello, " + name + "! 👋",
			Timestamp: time.Now().Format("2006-01-02 15:04:05"),
			From:      "Go Gin API Server",
		},
	}
	
	c.JSON(http.StatusOK, response)
}

// SayHelloPOST POST方式的问候接口
func SayHelloPOST(c *gin.Context) {
	var req SayHelloRequest
	
	// 绑定JSON请求体
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, Response{
			Code:    400,
			Message: "请求参数错误: " + err.Error(),
			Data:    nil,
		})
		return
	}
	
	response := Response{
		Code:    200,
		Message: "success",
		Data: SayHelloResponse{
			Greeting:  "Hello, " + req.Name + "! 🎉",
			Timestamp: time.Now().Format("2006-01-02 15:04:05"),
			From:      "Go Gin API Server (POST)",
		},
	}
	
	c.JSON(http.StatusOK, response)
}

// GetUser 获取用户信息示例
func GetUser(c *gin.Context) {
	userID := c.Param("id")
	
	// 模拟用户数据
	userData := map[string]interface{}{
		"id":       userID,
		"name":     "用户" + userID,
		"email":    "user" + userID + "@example.com",
		"avatar":   "https://avatars.githubusercontent.com/u/" + userID,
		"role":     "user",
		"status":   "active",
		"created":  "2024-01-01 10:00:00",
	}
	
	response := Response{
		Code:    200,
		Message: "获取用户信息成功",
		Data:    userData,
	}
	
	c.JSON(http.StatusOK, response)
}

// HealthCheck 健康检查接口
func HealthCheck(c *gin.Context) {
	healthData := map[string]interface{}{
		"status":    "healthy",
		"version":   "1.0.0",
		"timestamp": time.Now().Format("2006-01-02 15:04:05"),
		"uptime":    "运行中",
		"endpoints": []string{
			"GET  /api/v1/hello?name=YourName",
			"POST /api/v1/hello (JSON: {\"name\": \"YourName\"})",
			"GET  /api/v1/user/:id",
			"GET  /api/v1/health",
		},
	}
	
	response := Response{
		Code:    200,
		Message: "API服务器运行正常",
		Data:    healthData,
	}
	
	c.JSON(http.StatusOK, response)
}