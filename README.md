# JSON:API Exception Handling for TypeScript

A robust and modular library for managing exceptions in compliance with the [JSON:API specification](https://jsonapi.org/format/#errors). This library provides a comprehensive set of pre-defined exception classes for HTTP status codes, such as `BadRequestException`, `UnauthorizedException`, and `InternalServerErrorException`. Built with TypeScript, it supports clean code practices, extensibility, and seamless integration into Node.js applications or RESTful APIs.

## Features

- **Full JSON:API Compliance**: Pre-defined exceptions adhere to the [JSON:API error format](https://jsonapi.org/format/#errors).
- **TypeScript Support**: Leverages strong typing for better developer experience and code safety.
- **Customizable Exceptions**: Extend or configure exceptions to meet specific application needs.
- **Modular Design**: Import only the exceptions you need, minimizing application footprint.
- **Ready for Production**: Includes a comprehensive suite of unit tests for each exception class.
- **Easily Serializable**: All exceptions can be serialized to JSON for use in APIs or logs.

## Installation

Install the library using npm:

```bash
pnpm add @tackpay/http-exceptions
```
