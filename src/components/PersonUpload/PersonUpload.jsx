import React, { forwardRef } from "react";

export const PersonUpload = forwardRef((props, ref) => (
  <input type="file" {...props} ref={ref}/>
))
