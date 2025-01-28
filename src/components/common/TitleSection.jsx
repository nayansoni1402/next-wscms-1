'use client';
import { Card, Text, Row, Col, Image } from "@nextui-org/react";
import { useState } from "react";

const TitleSection = ({ category, productsCount, status, seoStatus, testimonialsStatus }) => {
      const [isHovered, setIsHovered] = useState(false);

      return (
            <Card
                  css={{
                        width: "350px",
                        margin: "10px",
                        transition: "transform 0.2s ease-in-out",
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                        "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                        },
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
            >
                  <Card.Header>
                        <Row justify="space-between">
                              <Col>
                                    <Text b>{category}</Text>
                              </Col>
                              <Col>
                                    <Text size={12}>{productsCount} Products</Text>
                              </Col>
                        </Row>
                  </Card.Header>
                  <Card.Body>
                        <Image
                              src={category.image} // Replace with actual image URL
                              alt={category.name}
                              width={200}
                              height={100}
                              objectFit="cover"
                        />
                  </Card.Body>
                  <Card.Footer>
                        <Row justify="space-between">
                              <Col>
                                    <Text color={status === "Active" ? "$green500" : "$red500"}>
                                          {status}
                                    </Text>
                              </Col>
                              <Col>
                                    <Text color={seoStatus === "Available" ? "$green500" : "$red500"}>
                                          {seoStatus}
                                    </Text>
                              </Col>
                              <Col>
                                    <Text color={testimonialsStatus === "Available" ? "$green500" : "$red500"}>
                                          {testimonialsStatus}
                                    </Text>
                              </Col>
                        </Row>
                  </Card.Footer>
            </Card>
      );
};

export default TitleSection;