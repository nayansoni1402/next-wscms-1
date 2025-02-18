import { Card, CardBody, CardHeader } from '@nextui-org/react'
import React from 'react'

export default function Comments() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          Price & Discount
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* <FormField
              control={form.control}
              name="basePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Price (Base Price)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. 50000" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mrp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Retail Price (MRP)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. 90000" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. 35000" {...field} />
                  </FormControl>
                </FormItem>
              )}
            /> */}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          Vendor Price & Margin
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* <FormField
              control={form.control}
              name="shipmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipment Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Ex. Direct, Manage etc." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="direct">Direct</SelectItem>
                      <SelectItem value="manage">Manage</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vendorMargin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Margin (%)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. 2,000" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gstRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GST Rate</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select GST Rate" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="12">12%</SelectItem>
                      <SelectItem value="18">18%</SelectItem>
                      <SelectItem value="28">28%</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />*/}
          </div>
          {/*  <FormField
            control={form.control}
            name="hsnCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter HSN Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          /> */}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          Festival Discount
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* <FormField
              control={form.control}
              name="offer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Offer</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Ex. Big Deal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="big-deal">Big Deal</SelectItem>
                      <SelectItem value="flash-sale">Flash Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="extraDiscount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extra Discount</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. 2,000" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="offerDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offer Date</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="From 12 Dec. to 12 Jan." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dec-jan">From 12 Dec. to 12 Jan.</SelectItem>
                      <SelectItem value="jan-feb">From 12 Jan. to 12 Feb.</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            /> */}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
