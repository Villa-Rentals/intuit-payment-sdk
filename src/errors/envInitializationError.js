/**
 * Copyright: Copyright © 2017
 * This file contains trade secrets of Villa Rentals. No part may be reproduced or transmitted in any
 * form by any means or for any purpose without the express written permission of Villa Rentals.
 */

'use strict'

module.exports = class EnvInitializationError extends Error {
  constructor (message, status) {
    super(message)

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.status = status || 500
  }
}
