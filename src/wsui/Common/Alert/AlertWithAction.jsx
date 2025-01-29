import React from 'react'
import { Alert, Button } from "@heroui/react";

export default function AlertWithAction({ type, desc }) {
      const [isVisible, setIsVisible] = React.useState(true);

      return (
            <>
                  {isVisible &&
                        <div className="flex items-center justify-center w-full">
                              <Alert
                                    onClose={() => setIsVisible(false)}
                                    color={type}
                                    isVisible={isVisible}
                                    description={desc}
                                    endContent={
                                          <Button color={type} size="sm" variant="flat">
                                                Send
                                          </Button>
                                    }
                                    title="Send Feedback to Devlopers..."
                                    variant="faded"
                              />
                        </div>}
            </>

      )
}
